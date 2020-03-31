import React from 'react';

import usePlayingCardRefs from '../../../hooks/usePlayingCardRefs';
import AnimatedPlayingCard from '../../AnimatedPlayingCard';
import { Column } from '../../layout';
import { Subheading } from '../../text';
import { getCardTransitionProps } from '../helpers';

const PickedCard = ({ card, onClick }) => {
  const { cardToPickRef, pickedCardRef } = usePlayingCardRefs();

  const cardTransitionProps = getCardTransitionProps(pickedCardRef.current, {
    fromNode: cardToPickRef.current
  });

  return (
    <Column spacing="s2">
      <Subheading>Picked card</Subheading>
      <AnimatedPlayingCard
        ref={pickedCardRef}
        card={card}
        onClick={onClick}
        transitionProps={cardTransitionProps}
      />
    </Column>
  );
};

export default PickedCard;
