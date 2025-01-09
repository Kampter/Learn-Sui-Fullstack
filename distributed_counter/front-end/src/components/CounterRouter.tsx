import { useState } from "react";
import { Counter } from "./counter";
import { CreateCounter } from "./CreateCounter";
import { Flex, Container, Heading, Text } from "@radix-ui/themes";
import { isValidSuiObjectId } from "@mysten/sui/utils";

export function CounterRouter({ account }: { account: any }) {
    const [counterId, setCounter] = useState(() => {
        const hash = window.location.hash.slice(1);
        return isValidSuiObjectId(hash) ? hash : null;
    });

    return (
        <Container size="2" mt="6">
            <Flex direction="column" gap="6">
                {!account ? (
                    <Flex 
                        align="center" 
                        justify="center" 
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            borderRadius: "16px",
                            padding: "32px",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <Heading 
                            size="3" 
                            style={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                            Please connect your wallet
                        </Heading>
                    </Flex>
                ) : counterId ? (
                    <Flex
                        direction="column"
                        gap="4"
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            borderRadius: "16px",
                            padding: "24px",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <Counter id={counterId} />
                    </Flex>
                ) : (
                    <Flex
                        align="center"
                        justify="center"
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            borderRadius: "16px",
                            padding: "32px",
                            backdropFilter: "blur(10px)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <CreateCounter 
                            onCreated={(id) => {
                                window.location.hash = id;
                                setCounter(id);
                            }}
                        />
                    </Flex>
                )}
            </Flex>
        </Container>
    );
}