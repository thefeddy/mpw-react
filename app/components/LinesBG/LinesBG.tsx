/* SCSS */
import './style.scss'

/* Libs */
import type { JSX } from 'react'

const COLORS: string[] = [
    '#937650',
    '#f9bd6d',
    '#e6842b',
    '#ce572c',
    '#807c4c',
    '#8c9169'
]

type LineProps = {
    color: string
}

function Line({ color }: LineProps): JSX.Element {
    return <div className="line" style={{ '--color': color } as React.CSSProperties} />
}

export default function LinesBG(): JSX.Element {
    return (
        <div className="lines">
            {COLORS.map((color, idx) => (
                <Line key={idx} color={color} />
            ))}
        </div>
    )
}
