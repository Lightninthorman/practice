(function() {
  "use strict";

  function SizeSelector(props) {
    function sizeOptions() {

      return props.sizes.map(function(num) {
        return (
          <option value={num} key={num}>
            {num}
          </option>
        );
      });
    }

    function onSizeChange (evnt){
        console.log(evnt.target.value);
        props.handleSizeChange(evnt.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <select defaultValue={props.size} name="sizeOptions" id="size-options" onChange={onSizeChange}>
          {sizeOptions()}
        </select>
      </div>
    );
  }

  function ColorSelector(props) {
    function colorOptions() {

      return props.colors.map(function(name) {
        return (
          <option value={name} key={name}>
            {name}
          </option>
        );
      });
    }

    function onColorChange(evnt){
        props.handleColorChange(evnt.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <select defaultValue={props.color} name="colorOptions" id="color-options" onChange={onColorChange}>
          {colorOptions()}
        </select>
      </div>
    );
  }


  function ProductImage(props) {
    return <img src={`../../../assets/${props.color}.jpg`} alt="Product Image" />;
  }

  function ProductCustomizer(props) {

      var [size, setSize] = React.useState(8);
      var [sizes, setSizes] = React.useState(window.Inventory.allSizes);
      var [color, setColor] = React.useState("green");
      var [colors, setColors] = React.useState(window.Inventory.allColors);

      function handleSizeChange(selectedSize){
          let availableColors= window.Inventory.bySize[selectedSize];
          setColors(availableColors);
      }

      function handleColorChange(selectedColor){
          let availableSizes = window.Inventory.byColor[selectedColor];
          setSizes(availableSizes);
          setColor(selectedColor);
      }


    return (
      <div className="customizer">
        <div className="product-image">
          <ProductImage color={color}/>
        </div>
        <div className="selectors">
          <SizeSelector size={size} sizes={sizes} handleSizeChange={handleSizeChange}/>
          <ColorSelector color={color} colors={colors} handleColorChange={handleColorChange}/>
        </div>
      </div>
    );
  }

  ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
})();
