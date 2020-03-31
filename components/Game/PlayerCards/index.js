import React from 'react';

import usePlayingCardRefs from '../../../hooks/usePlayingCardRefs';
import CardSpot from '../../CardSpot';
import { Row } from '../../layout';
import PlayingCard from '../../PlayingCard';
import { CardInfo, CardWrapper } from './_styled';

const PlayerCards = ({
  cardBeingWatched,
  cardPlayerId,
  cards,
  onCardHide,
  onCardPick,
  selectedCards,
  shouldRevealAllCards,
  unfoldedCards
}) => {
  const { setPlayerCardRef } = usePlayingCardRefs();

  const isCardBeingWatched = cardIndex => {
    return (
      cardBeingWatched &&
      cardBeingWatched.index === cardIndex &&
      cardBeingWatched.cardPlayerId === cardPlayerId
    );
  };

  return (
    <Row spacing="s1_5">
      {cards.map((card, cardIndex) => (
        <div key={cardIndex} ref={setPlayerCardRef(cardPlayerId, cardIndex)}>
          {card ? (
            <CardWrapper>
              {(unfoldedCards[cardPlayerId] && unfoldedCards[cardPlayerId][cardIndex]) ||
              shouldRevealAllCards ? (
                <PlayingCard card={card} onClick={() => onCardHide(cardIndex, cardPlayerId)} />
              ) : (
                // TEMP: keep cards visibile to ease debugging
                <div style={{ opacity: 0.15 }}>
                  {isCardBeingWatched(cardIndex) && (
                    <CardInfo>{cardBeingWatched.player.name} is watching</CardInfo>
                  )}
                  <PlayingCard
                    card={card}
                    isSelected={selectedCards[cardPlayerId] === cardIndex}
                    onClick={() => onCardPick(cardIndex, cardPlayerId)}
                  />
                </div>
              )}
            </CardWrapper>
          ) : (
            <CardSpot label="No Card" />
          )}
        </div>
      ))}
    </Row>
  );
};

export default PlayerCards;
