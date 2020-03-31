import React from 'react';

import usePlayingCardRefs from '../../../hooks/usePlayingCardRefs';
import CardSpot from '../../CardSpot';
import { Column, Row } from '../../layout';
import PlayingCard from '../../PlayingCard';
import { Subheading } from '../../text';

const DiscardPile = ({ discardPile, onDrawDiscarded, onDrawNew }) => {
  const { cardToPickRef, discardedCardRef } = usePlayingCardRefs();

  return (
    <Column spacing="s2">
      <Subheading>Discard Pile</Subheading>
      <Row spacing="s1_5">
        <div ref={discardedCardRef}>
          {discardPile && discardPile.length ? (
            <PlayingCard card={discardPile[discardPile.length - 1]} onClick={onDrawDiscarded} />
          ) : (
            <CardSpot />
          )}
        </div>
        <PlayingCard ref={cardToPickRef} isHidden onClick={onDrawNew} />
      </Row>
    </Column>
  );
};

export default DiscardPile;
