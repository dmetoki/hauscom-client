const default_legend = {
    show:       true,
    icon:       'circle',
    formatter: (name) => {
        return name.charAt(0).toUpperCase() + name.substr(1);
    },
    itemWidth:  10,
    itemHeight: 10,
    itemGap:    15,
    orient:     'vertical',
    top:        '35%',
    left:       '10px',
    textStyle: {
        color: '#fafafa',
        fontSize: '.8rem'
    }
}

export {default_legend}