const colors = require("windicss/colors")

module.exports = {
    theme: {
        extend: {
            colors: {
                ...colors,
                primary: colors.indigo[500],
                secondary: colors.indigo[700],
                success: colors.green[500],
                error: colors.red[500],
                warning: colors.yellow[500],
                info: colors.blue[500]
            }
        }
    }
}
