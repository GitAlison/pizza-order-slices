import { useEffect, useState } from 'react';
import './App.css'
import chiken from './assets/pizza_flavors/chiken.jpeg'
import fourCheese from './assets/pizza_flavors/fourChesse.jpeg';
import peperoni from './assets/pizza_flavors/pepperoni.jpeg'
import margerita from './assets/pizza_flavors/margerita.jpeg'
import InputSlices from './components/inputSlices';

const defaultFlavors = [
  'chiken',
  'fourCheese',
  'peperoni',
  'margerita',
]

function App() {

  const [pizzaSlices, setPizzaSlices] = useState<number>(3)
  const [flavorsSelected, setFlavorsSelected] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([])
  const [selectedSlice, setSelectedSlice] = useState<number | undefined>(undefined)

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handlerClickAddFlavor = (flavor: string) => {

    if (selectedSlice != undefined) {
      flavorsSelected[selectedSlice] = flavor;
      setFlavorsSelected([...flavorsSelected]);
      setOpenModal(false)
    }
  }
  const handlerClickRemoveFlavor = (index: number) => {
    flavorsSelected[index] = ''
    flavorsSelected
    setFlavorsSelected([...flavorsSelected]);

  }
  const handlerClickOpenModal = (slice: number) => {
    setSelectedSlice(slice)
    setOpenModal(true)
  }

  const getSelectedFlavor = (index: number) => {

    if (flavorsSelected[index] != '') {
      return `url('#${flavorsSelected[index]}')`
    }
    return colors[index]
  }

  const getRandomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');


  useEffect(() => {
    const flavorsSelectedData = Array.from({ length: pizzaSlices }).map(() => '');
    setFlavorsSelected(flavorsSelectedData)
    const randomColors = Array.from({ length: pizzaSlices }).map(() => getRandomColor());
    setColors(randomColors)

  }, [pizzaSlices])

  return (
    <div>
      <div className='container'>
        <div className='order'>
          <span className='order__title'> {flavorsSelected.length ? 'Your Order' : 'Select your flavor'}</span>
          <InputSlices onChange={(val) => setPizzaSlices(val)} />
          <span className='order__description'> Click on slice to select you flavor</span>
          <div className='order__flavors_selected'>
            {flavorsSelected.map((e, index) =>
              e ? <span key={index} className='order__flavor_selected' >
                {e} <button onClick={() => handlerClickRemoveFlavor(index)} className='order__flavor_remove_button'>❌</button>
              </span>
                : null)}
          </div>
        </div>
        <div className={`pizza ${pizzaSlices == flavorsSelected.filter((obj) => obj != '').length ? 'done' : ''} `}>
          <svg>
            <defs>
              <pattern id="chiken" patternUnits="objectBoundingBox" width="19" height="20">
                <image xlinkHref={chiken} width="20" height="20" />
              </pattern>
            </defs>
            <defs>
              <pattern id="peperoni" patternUnits="objectBoundingBox"
                width="10"
                height="10">
                <image xlinkHref={peperoni} width="16" height="16" />
              </pattern>
            </defs>
            <defs>
              <pattern id="fourCheese" patternUnits="objectBoundingBox"
                width="12"
                height="12">
                <image xlinkHref={fourCheese} width="18" height="18" />
              </pattern>
            </defs>
            <defs>
              <pattern id="margerita" patternUnits="objectBoundingBox"
                width="12"
                height="12">
                <image xlinkHref={margerita} width="18" height="18" />
              </pattern>
            </defs>
          </svg>

          {Array.from({ length: pizzaSlices }).map((_, index) => {

            return (
              <svg key={index} height="100%" width="100%" viewBox="0 0 20 20" style={{
                transform: `rotate(${(index + 1) * (360 / pizzaSlices)}deg)`
              }}>
                <circle onClick={() => { handlerClickOpenModal(index) }} r="5" cx="10" cy="10" fill="transparent"
                  stroke={getSelectedFlavor(index) != '' ? getSelectedFlavor(index) : getRandomColor()}
                  strokeWidth="10"
                  strokeDasharray={`${31.4 / pizzaSlices} 31.4`}

                />

              </svg>
            )
          })}
        </div>
        {pizzaSlices == flavorsSelected.filter((obj) => obj != '').length ?
          <span className='finish_button'>
            Finished ✅
          </span> : null
        }
      </div>

      <div className={`modal ${openModal ? 'open' : 'close'}`}>
        <div className="modal__overlay">
        </div>
        <div className="modal__content">
          <div className='modal__header'>
            <h5>
              Flavors
            </h5>
            <button onClick={() => setOpenModal(false)}>
              ❌
            </button>
          </div>
          <ul className="list_available_flavors">
            {defaultFlavors.map(flavor => {
              return <li onClick={() => { handlerClickAddFlavor(flavor) }} key={flavor}>{flavor}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
