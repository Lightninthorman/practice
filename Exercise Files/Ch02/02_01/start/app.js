(function() {
  "use strict";

  function ProductImage(props){


      return React.createElement('img', {src:'../../../assets/red.jpg', alt:'red_shoe'})
  }

  function ProductCustomizer(props){
      return React.createElement(
          'div',
          {className:'customizer'},
          React.createElement("div",{className:'product-image'}, React.createElement(ProductImage))
      );
  }

  ReactDOM.render(
      React.createElement(ProductCustomizer),
      document.getElementById('react-root')
  )
})();
