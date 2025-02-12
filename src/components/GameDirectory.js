import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import GameCard from './GameCard';

const GET_GAMES = gql`
  query GetGames {
    games {
      id
      name
      is_live
      directory_image_name
      directory_gif_name
      genres {
        genre_name
      }
    }
  }
`;

const GET_GENRES = gql`
  query GetGenres {
    game_genre_types {
      genre_name
    }
  }
`;

const DirectoryContainer = styled.div`
  padding: 2rem;
  background: #121212;
  min-height: 100vh;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: white;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: white;
`;

const Toggle = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #333;
  background: ${props => props.active ? '#333' : '#1a1a1a'};
  color: white;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const { loading: gamesLoading, data: gamesData } = useQuery(GET_GAMES);
  const { loading: genresLoading, data: genresData } = useQuery(GET_GENRES);

  if (gamesLoading || genresLoading) return <div>Loading...</div>;

  const filteredGames = gamesData.games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || game.genres.some(g => g.genre_name === selectedGenre);
    const matchesLive = !showLiveOnly || game.is_live;
    return matchesSearch && matchesGenre && matchesLive;
  });

  return (
    <DirectoryContainer>
      <Controls>
        <Input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genresData.game_genre_types.map(genre => (
            <option key={genre.genre_name} value={genre.genre_name}>
              {genre.genre_name}
            </option>
          ))}
        </Select>
        <Toggle
          active={showLiveOnly}
          onClick={() => setShowLiveOnly(!showLiveOnly)}
        >
          {showLiveOnly ? 'Show All' : 'Show Live Only'}
        </Toggle>
      </Controls>
      <Grid>
        {filteredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </Grid>
    </DirectoryContainer>
  );
};

export default GameDirectory; 