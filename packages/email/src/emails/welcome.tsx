import {
	Body,
	Container,
	Head,
	Html,
	Link,
	Preview,
	Text,
} from "@react-email/components";

interface WelcomeEmailProps {
	userEmail?: string;
}

export const WelcomeEmail = ({
	userEmail = "user@example.com",
}: WelcomeEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Welcome to Notra - A quick note from the founder</Preview>
			<Body style={{ fontFamily: "sans-serif", padding: "20px" }}>
				<Container style={{ maxWidth: "600px" }}>
					<Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
						Hey!
					</Text>

					<Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
						I'm Dominik, the founder of Notra. I wanted to personally welcome you
						and say thanks for signing up.
					</Text>

					<Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
						I built Notra because I was frustrated with how scattered content
						creation had become. I hope it helps you as much as it's helped me.
					</Text>

					<Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
						If you have any questions, feedback, or just want to chat - reply to
						this email. I read every single one.
					</Text>

					<Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
						Cheers,
						<br />
						Dominik
					</Text>

					<Text
						style={{
							fontSize: "14px",
							lineHeight: "1.6",
							color: "#666",
							marginTop: "32px",
						}}
					>
						P.S. You can get started at{" "}
						<Link href="https://app.usenotra.com" style={{ color: "#0066cc" }}>
							app.usenotra.com
						</Link>
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

export default WelcomeEmail;
