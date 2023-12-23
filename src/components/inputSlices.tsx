import React, { useState } from 'react'

type PropsInputSlices = {
    onChange: (value: number) => void
}

const stylesContainer: React.CSSProperties = {
    display: 'inline-flex',
    marginLeft: 10,
    marginBottom: 10,
    border: '1px solid'

}
const stylesLabel: React.CSSProperties = {
    fontSize: '14px',
    fontFamily: 'Courier New, Courier, monospace'
}
const stylesButton: React.CSSProperties = {
    width: 30,
    fontSize: '20px',
    cursor: 'pointer',
    border: '1px solid',
}
const stylesValue: React.CSSProperties = {
    width: 30,
    textAlign: 'center'
}

const styles = {
    container: stylesContainer,
    button: stylesButton,
    value: stylesValue,
    label: stylesLabel
}




export default function InputSlices(props: PropsInputSlices) {
    const [value, setValue] = useState<number>(3);


    const changeQuantity = (operation?: string) => {

        let newValue = value;
        if (operation == 'add') {
            if (value <= 7) {
                newValue += 1
            }
        } else {
            if (value > 3) {
                newValue -= 1
            }
        }
        setValue(newValue)
        props.onChange(newValue)
    }

    return (
        <div>
            <label style={styles.label}>Slice quantities:</label>
            <div style={styles.container}>
                <button disabled={value == 3} onClick={() => { changeQuantity() }} style={styles.button}>
                    -
                </button>
                <span style={styles.value}>
                    {value}
                </span>
                <button disabled={value >= 7} onClick={() => { changeQuantity('add') }} style={styles.button}>
                    +
                </button>
            </div>
        </div>
    )
}
