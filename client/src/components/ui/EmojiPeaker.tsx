import React, { useState } from 'react';

export default function EmojiPeaker() {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(emojiObject.target);
  };

  return (
    <div>
      <h3>GeeksforGeeks Emoji Picker</h3>
      {chosenEmoji ? (
        <span>
          Your Emoji:
          <img style={{ width: '15px' }} src={chosenEmoji.target.src} />
        </span>
      ) : (
        <span>No Emoji</span>
      )}
      <Picke onEmojiClick={onEmojiClick} />
    </div>
  );
}
