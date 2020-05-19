import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="empty"></div>
        <footer id="sticky-footer">
          <p className="copyright">
            Made with <span role="img">❤️</span> by Sybille Kasslatter
          </p>
        </footer>
      </div>
    );
  }
}
