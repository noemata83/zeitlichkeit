export default theme => ({
    input: {
        background: 'transparent',
        border: 0,
        borderBottom: '1px solid white',
        outline: 'none',
        display: 'inline-block',
        fontSize: '2rem',
        margin: '0 .5rem',
        paddingBottom: '1rem',
        color: '#fff',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '50%',
},
Link: {
    '&:visited': {
        display: 'inline-block',
        width: '50%',
        cursor: 'pointer',
        textAlign: 'right',
        fontSize: '2rem',
        padding: 0,
        margin: '1rem 0',
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        outline: 'none',
        border: 'none',
        '&:hover': {
            textDecoration: 'underline',
            fontWeight: 'bold',
        }
    },
    display: 'inline-block',
    width: '50%',
    cursor: 'pointer',
    textAlign: 'right',
    fontSize: '2rem',
    padding: 0,
    margin: '1rem 0',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    outline: 'none',
    border: 'none',
    '&:hover': {
        textDecoration: 'underline',
        fontWeight: 'bold',
    }
},
Back: { 
    marginLeft: '1rem'
},
Fields: {
    display: 'flex',
    flexWrap: 'wrap',
    // [theme.breakpoints.up('lg')]: {
    //     flexWrap: 'nowrap',
    //   },
    width: '100%',
},
Field: {
    display: 'inline-block',
    flexBasis: '20%',
    flexShrink: 1,
    font: 'inherit',
    margin: '.5rem 0',
},
Controls: {
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
},
Form: {
    margin: '1rem',
    overflow: 'hidden',
},
Error: {
    fontSize: '1.2rem',
    color: 'red',
    height: '1.2rem',
}
});