import styles from './btnStyles.module.css'

export const Button1 = () => {
    return (
        <div className={styles.box1}>
            <div className={styles.btn}>
                <div className={styles.boxBtnOne}>
                    <span>HOVER ME</span>
                </div>
            </div>
        </div>

    )
}

export const Button2 = ({texto, CssNumero, onClick, spans=4}) => {
    let style
    const range = [...Array(spans)]
    switch (CssNumero) {
        case (1): {style = styles.animatedButton1; break}
        case (2): {style = styles.animatedButton2; break}
        case (3): {style = styles.animatedButton3; break}
        case (4): {style = styles.animatedButton4; break}
        case (5): {style = styles.animatedButton5; break}
        case (6): {style = styles.animatedButton5; break}
        case (7): {style = styles.animatedButton5; break}
        case (8): {style = styles.animatedButton5; break}
        case (9): {style = styles.animatedButton5; break}
        case (10): {style = styles.animatedButton5; break}
        case (11): {style = styles.animatedButton5; break}
        case (12): {style = styles.animatedButton5; break}
    }

    return (
        <button className={style} onClick={onClick}>
                {range.map( n => (<span key={n}></span>))}
            
            {texto}
        </button>

    )
}

export const DivAnimated = ({texto, CssNumero, spans=4, styleAdicional=''}) => {
    let style
    const range = [...Array(spans)]
    switch (CssNumero) {
        case (1): {style = styles.animatedButton1; break}
        case (2): {style = styles.animatedButton2; break}
        case (3): {style = styles.animatedButton3; break}
        case (4): {style = styles.animatedButton4; break}
        case (5): {style = styles.animatedButton5; break}
        case (6): {style = styles.animatedButton5; break}
        case (7): {style = styles.animatedButton5; break}
        case (8): {style = styles.animatedButton5; break}
        case (9): {style = styles.animatedButton5; break}
        case (10): {style = styles.animatedButton5; break}
        case (11): {style = styles.animatedButton5; break}
        case (12): {style = styles.animatedButton5; break}
    }

    let Addstyle = (styleAdicional == '') ? style : `${style} ${styleAdicional}`
    return (
        <div className={Addstyle}>

                {range.map( n => (<span key={n}></span>))}
            
                {texto}
           
        </div>

    )
}

// <!-- Hover #1 -->

 
// <!-- Hover #2 -->
// <div class="box-2">
//   <div class="btn btn-two">
//     <span>HOVER ME</span>
//   </div>
// </div>

// <!-- Hover #3 -->
// <div class="box-3">
//   <div class="btn btn-three">
//     <span>HOVER ME</span>
//   </div>
// </div>