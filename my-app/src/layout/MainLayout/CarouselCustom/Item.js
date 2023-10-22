import { Paper, Button } from "@mui/material";

export default function Item({ item }) {
    return (
        <Paper className="Paper-Carousel">
            <img
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "5%",
                }}
                src={URL.createObjectURL(item.file)} />
        </Paper>
    )
}
