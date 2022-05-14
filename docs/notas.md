## Antiga
Antiga estilização das `div` do Schedule e Heatmap

```css
  > div#top-left {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  > div.day {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.1);
      height: 100%;
      width: 1px;
      right: -3px;
    }
  }

  > div.time {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.1);
      height: 1px;
      width: 100%;
      bottom: -3px;
    }
  }
```