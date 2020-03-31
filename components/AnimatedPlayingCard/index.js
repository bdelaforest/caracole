import React, { forwardRef } from 'react';
import { animated, useTransition } from 'react-spring';

import PlayingCard from '../PlayingCard';

const AnimatedPlayingCard = ({ transitionProps, card, ...rest }, ref) => {
  const transitions = useTransition(
    card,
    card => (card ? `${card.suit}_${card.value}` : null),
    transitionProps
  );

  return (
    <div ref={ref}>
      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div key={key} style={props}>
              <PlayingCard card={item} {...rest} />
            </animated.div>
          )
        );
      })}
    </div>
  );
};

export default forwardRef(AnimatedPlayingCard);
