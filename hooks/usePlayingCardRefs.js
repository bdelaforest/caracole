import { useCallback, useContext, createContext, useRef } from 'react';

const PlayingCardsRefsContext = createContext(null);

export const PlayingCardsRefsProvider = ({ children }) => {
  // Single cards
  const cardToPickRef = useRef();
  const pickedCardRef = useRef();
  const discardedCardRef = useRef();

  // Player cards
  const playerCardsRef = useRef({}); // { [playerId]: { [cardIndex]: HTLMElement }}

  const getPlayerCardNode = useCallback(
    (playerId, cardIndex) => {
      const playerCards = playerCardsRef.current[playerId] || {};
      return playerCards[cardIndex];
    },
    [playerCardsRef]
  );

  const setPlayerCardRef = useCallback(
    (playerId, cardIndex) => node => {
      playerCardsRef.current[playerId] = {
        ...playerCardsRef.current[playerId],
        [cardIndex]: node
      };
    },
    [playerCardsRef]
  );

  const value = {
    cardToPickRef,
    discardedCardRef,
    getPlayerCardNode,
    pickedCardRef,
    setPlayerCardRef
  };

  return (
    <PlayingCardsRefsContext.Provider value={value}>{children}</PlayingCardsRefsContext.Provider>
  );
};

const usePlayingCardRefs = () => {
  const playingCardsRefsContext = useContext(PlayingCardsRefsContext);
  if (!playingCardsRefsContext) {
    throw Error('You should not use useGame outside a <GameProvider>');
  }

  return playingCardsRefsContext;
};

export default usePlayingCardRefs;
