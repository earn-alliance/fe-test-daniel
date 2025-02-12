import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
`;

const Content = styled.div`
  padding: 1rem;
  color: white;
`;

const Title = styled.h3`
  margin: 0;
  transition: transform 0.3s ease-in-out;
`;

const LiveBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff4444;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: white;
  transition: opacity 0.3s ease-in-out;
`;

const Genre = styled.span`
  display: inline-block;
  background: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  transition: opacity 0.3s ease-in-out;
`;

const Description = styled.p`
  margin: 0.5rem 0 0;
  opacity: 0;
  height: 0;
  transition: all 0.3s ease-in-out;
`;

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image 
        src={`/images/${isHovered ? game.directory_gif_name : game.directory_image_name}`} 
        alt={game.name}
      />
      {game.is_live && <LiveBadge style={{ opacity: isHovered ? 0 : 1 }}>LIVE</LiveBadge>}
      <Content>
        <Title style={{ transform: isHovered ? 'translateY(-10px)' : 'none' }}>
          {game.name}
        </Title>
        {game.genres && (
          <Genre style={{ opacity: isHovered ? 0 : 1 }}>
            {game.genres[0]?.genre_name}
          </Genre>
        )}
        <Description style={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}>
          A fantastic gaming experience awaits
        </Description>
      </Content>
    </Card>
  );
};

export default GameCard; 