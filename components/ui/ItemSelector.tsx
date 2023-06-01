import { ISizes } from "@/interfaces"
import { Box, Button } from "@mui/material"
import { FC } from "react"

interface Props {
    selected?: ISizes,
    sizes: ISizes[],
    onSelectedSize: ( size: ISizes ) => void
}

export const ItemSelector: FC<Props> = ({ selected, sizes, onSelectedSize }) => {
  return (
    <Box>
        {
            sizes?.map(size => (
                <Button
                    key={ size }
                    size='small'
                    color={ selected === size ? 'primary' : 'info' }
                    onClick={ () => onSelectedSize( size ) }
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}
