const colors = require("windicss/colors")

const extraColors = {
    primary: colors.indigo,
    default: colors.gray,
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue
}

const alpha = {}

for (let i = 1; i < 10; i++) {
    const decimal = i * 10
    const hex = Math.ceil((255 / 10) * i).toString(16)
    alpha[decimal] = hex
}

function getAlpha(shade, defaultAlpha = 50) {
    let rightShade = ""

    if (shade.length === 4) {
        for (const char of [...shade]) {
            if (char !== "#") {
                rightShade += `${char}${char}`
            }
        }

        rightShade = `#${rightShade}`
    } else {
        rightShade = shade
    }

    const result = {}

    for (let i = 10; i < 100; i += 10) {
        result[i] = `${rightShade}${alpha[i]}`
    }

    result.DEFAULT = result[defaultAlpha]

    return result
}

function getShades(color, withAlpha, defaultShade = 600) {
    const result = {}

    for (const [key, value] of Object.entries(color)) {
        result[key] = withAlpha ? getAlpha(value) : value
    }

    if (!withAlpha) {
        result.DEFAULT = result[defaultShade]
    }

    return result
}

function transformColors(allColors, withAlpha = true) {
    const result = {}

    for (const [key, value] of Object.entries(allColors)) {
        if (typeof value === "string") {
            result[key] = withAlpha ? getAlpha(value) : value
        } else {
            result[key] = getShades(value, withAlpha)
        }
    }

    return result
}

module.exports = {
    theme: {
        extend: {
            colors: {
                ...colors,
                ...transformColors(extraColors, false),
                alpha: transformColors({
                    ...colors,
                    ...extraColors
                })
            }
        }
    }
}
