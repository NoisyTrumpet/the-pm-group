import { Box, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react"
import * as React from "react"

export const Feature = props => {
  const { title, children, icon } = props
  return (
    <Stack
      spacing={{
        base: "3",
        md: "6",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Box
        fontSize="4xl"
        padding={2}
        bg={`secondary`}
        borderRadius={`50%`}
        height={`fit-content`}
        width={`fit-content`}
        transform={`rotate(5deg) scaleX(-1)`}
      >
        {icon}
      </Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg" color={`black`}>
          {title}
        </Text>
        <Box
          color={mode("gray.600", "gray.400")}
          style={
            title === "EVENTS, PROMOTIONS, AND FUNDRAISERS" && {
              textAlign: "center",
            }
          }
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  )
}