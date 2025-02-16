import React, { useState, useEffect } from "react";
import { Box, Button, Chip, Typography } from "@mui/joy";
import { BASE_PATH } from "./Constants";

function App() {
	const [primaryCount, setPrimaryCount] = useState(0);
	const [secondaryCount, setSecondaryCount] = useState(0);

	useEffect(() => {
		const storedPrimary = localStorage.getItem("primaryCount");
		const storedSecondary = localStorage.getItem("secondaryCount");
		if (storedPrimary) setPrimaryCount(parseInt(storedPrimary, 10));
		if (storedSecondary) setSecondaryCount(parseInt(storedSecondary, 10));
	}, []);

	const playAudio = (count) => {
		if (count == 5) {
			const newCount = primaryCount + 1;
			setPrimaryCount(newCount);
			localStorage.setItem("primaryCount", newCount);
		} else {
			const newCount = secondaryCount + 1;
			setSecondaryCount(newCount);
			localStorage.setItem("secondaryCount", newCount);
		}
		const audio = new Audio(`${BASE_PATH}/audio/${count}.m4a`);
		audio.play();
	};
	return (
		<>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Typography
					style={{ marginBottom: "10px", paddingLeft: "100px", paddingRight: "100px" }}
					level="h1"
				>
					Duolingo Uwing Sounds
				</Typography>
				<Typography
					style={{ marginBottom: "50px", paddingLeft: "100px", paddingRight: "100px" }}
				>
					Click away to hear the cute "uwing" sounds that Duo makes when you get a
					5-correct or 10-correct streak !!!
				</Typography>
				<img
					src={`${BASE_PATH}/img/waving-duo.png`}
					width={232}
					height={256}
					style={{ marginBottom: "50px" }}
				/>
				<Box display="flex" gap={2}>
					<Button size="lg" onClick={() => playAudio(5)}>
						5 in a row
						<Chip
							sx={{
								"--Chip-radius": "0px",
							}}
							style={{ marginLeft: "10px" }}
							title="Click counter"
						>
							{primaryCount}
						</Chip>
					</Button>
					<Button size="lg" onClick={() => playAudio(10)}>
						10 in a row
						<Chip
							sx={{
								"--Chip-radius": "0px",
							}}
							style={{ marginLeft: "10px" }}
							title="Click counter"
						>
							{secondaryCount}
						</Chip>
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default App;
