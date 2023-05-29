import { ISizes } from "@/interfaces"
import { Box, Button } from "@mui/material"
import { FC } from "react"

interface Props {
    selected?: ISizes,
    sizes: ISizes[]
}

export const ItemSelector: FC<Props> = ({ selected, sizes }) => {
  return (
    <Box>
        {
            sizes?.map(size => (
                <Button
                    key={ size }
                    size='small'
                    color={ selected === size ? 'primary' : 'info' }
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}
