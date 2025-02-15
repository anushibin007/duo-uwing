import { Box, Button } from "@mui/joy";
import { BASE_PATH } from "./Constants";

function App() {
	const playAudio = (count) => {
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
				<img
					src={`${BASE_PATH}/img/waving-duo.png`}
					width={256}
					height={256}
					style={{ marginBottom: "50px" }}
				/>
				<Box display="flex" gap={2}>
					<Button size="lg" onClick={() => playAudio(5)}>
						5 in a row
					</Button>
					<Button size="lg" onClick={() => playAudio(10)}>
						10 in a row
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default App;
