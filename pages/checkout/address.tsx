import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { GetServerSideProps } from 'next'
import { ShopLayout } from "../../components/layouts"
import { jwt } from "../../utils"


const AddressPage = () => {
    return (
        <ShopLayout title="Address" pageDescription="Confirm Address">
            <Typography variant="h1" component='h1'>Address</Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>

                <Grid item xs={12} sm={6}>
                    <TextField label='Name' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Last Name' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Address' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Address 2 (optional)' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Postal Code' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='City' variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant="filled"
                            label="Country"
                            value={1}
                        >
                            <MenuItem value={1}>Unites States</MenuItem>
                            <MenuItem value={2}>Mexico</MenuItem>
                            <MenuItem value={3}>Spain</MenuItem>
                            <MenuItem value={4}>Colombia</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Teléfono' variant="filled" fullWidth />
                </Grid>

            </Grid>


            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button color="secondary" className="circular-btn" size="large">
                    Check your order
                </Button>
            </Box>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { token = '' } = req.cookies  // your fetch function here 
    let isValidToken = false

    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if (!isValidToken) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }
}

export default AddressPage