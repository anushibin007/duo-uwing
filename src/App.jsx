import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/joy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { BASE_PATH } from "./Constants";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://okhkpbmauwidzsrithmo.supabase.co";
const supabase = createClient(
	SUPABASE_URL,
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9raGtwYm1hdXdpZHpzcml0aG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MzQwOTEsImV4cCI6MjA1NTMxMDA5MX0.0jDncM_gOnXo58L9oSgLSBr0R9cHnYJJyh-TClJ4LII"
);

function App() {
	const [primaryCount, setPrimaryCount] = useState(0);
	const [secondaryCount, setSecondaryCount] = useState(0);
	const [updateTimer, setUpdateTimer] = useState(null);
	const [flipImageVal, setFlipImageVal] = useState(1);

	useEffect(() => {
		fetchCounts();
	}, []);

	const fetchCounts = async () => {
		const { data } = await supabase.from("button_counts").select("*").single();
		if (data) {
			setPrimaryCount(data.primary_count);
			setSecondaryCount(data.secondary_count);
		}
	};

	const updateCountsToServer = async () => {
		await supabase.from("button_counts").upsert({
			id: 1,
			primary_count: primaryCount,
			secondary_count: secondaryCount,
		});
	};

	const scheduleUpdate = () => {
		if (updateTimer) clearTimeout(updateTimer);
		setUpdateTimer(setTimeout(updateCountsToServer, 2000)); // 2-second delay
	};

	const playAudio = (count) => {
		if (count == 5) {
			const newCount = primaryCount + 1;
			setPrimaryCount(newCount);
		} else {
			const newCount = secondaryCount + 1;
			setSecondaryCount(newCount);
		}
		const audio = new Audio(`${BASE_PATH}/audio/${count}.m4a`);
		audio.play();
		scheduleUpdate();
		setFlipImageVal((val) => {
			return val * -1;
		});
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
					style={{ marginBottom: "50px", transform: `scale(${flipImageVal}, 1)` }}
				/>
				<Box display="flex" gap={4}>
					<Box display="flex" flexDirection="column" alignItems="center">
						<Button
							size="lg"
							startDecorator={<PlayArrowIcon />}
							onClick={() => playAudio(5)}
						>
							5 in a row
						</Button>
						<Typography level="body-xs" marginTop={1}>
							{primaryCount} plays
						</Typography>
					</Box>
					<Box display="flex" flexDirection="column" alignItems="center">
						<Button
							size="lg"
							startDecorator={<PlayArrowIcon />}
							onClick={() => playAudio(10)}
						>
							10 in a row
						</Button>
						<Typography level="body-xs" marginTop={1}>
							{secondaryCount} plays
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default App;
