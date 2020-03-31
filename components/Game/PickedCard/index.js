import React from 'react';

import usePlayingCardRefs from '../../../hooks/usePlayingCardRefs';
import { Column } from '../../layout';
import PlayingCard from '../../PlayingCard';
import { Subheading } from '../../text';

const PickedCard = ({ card, onClick }) => {
  const { pickedCardRef } = usePlayingCardRefs();

  return (
    card && (
      <Column spacing="s2">
        <Subheading>Picked card</Subheading>
        <PlayingCard ref={pickedCardRef} card={card} onClick={onClick} />
      </Column>
    )
  );
};

export default PickedCard;
