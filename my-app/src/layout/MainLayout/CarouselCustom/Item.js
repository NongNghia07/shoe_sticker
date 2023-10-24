import { Paper } from "@mui/material";

export default function Item({ item }) {
    return (
        <Paper>
            <img
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "5%",
                }}
                src={typeof item.file == 'object' ? URL.createObjectURL(item.file) : item.file} />
        </Paper>
    )
}
