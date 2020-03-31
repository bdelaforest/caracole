import React from 'react';

import usePlayingCardRefs from '../../../hooks/usePlayingCardRefs';
import AnimatedPlayingCard from '../../AnimatedPlayingCard';
import { Row } from '../../layout';
import CardSpot from '../../CardSpot';
import PlayingCard from '../../PlayingCard';

import { CardInfo, CardWrapper } from './_styled';
import { getCardTransitionProps } from '../helpers';

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
  const { pickedCardRef, getPlayerCardNode, setPlayerCardRef } = usePlayingCardRefs();

  const isCardBeingWatched = cardIndex => {
    return (
      cardBeingWatched &&
      cardBeingWatched.index === cardIndex &&
      cardBeingWatched.cardPlayerId === cardPlayerId
    );
  };

  return (
    <Row spacing="s1_5">
      {cards.map((card, cardIndex) => {
        const cardNode = getPlayerCardNode(cardPlayerId, cardIndex);
        const transitionProps = getCardTransitionProps(cardNode, {
          // TODO: Handle the case where card comes from another player (and not from the picked card)
          fromNode: pickedCardRef.current
        });
        return (
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
                    <AnimatedPlayingCard
                      card={card}
                      isSelected={selectedCards[cardPlayerId] === cardIndex}
                      onClick={() => onCardPick(cardIndex, cardPlayerId)}
                      transitionProps={transitionProps}
                    />
                  </div>
                )}
              </CardWrapper>
            ) : (
              <CardSpot label="No Card" />
            )}
          </div>
        );
      })}
    </Row>
  );
};

export default PlayerCards;
