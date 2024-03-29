import { useColorModeValue as mode } from "@chakra-ui/react"
import * as React from "react"
import Link from "../../Link/Link"

const NavLink = props => {
  const { isActive, ...rest } = props

  if (props.children === "Connect") {
    return (
      <Link
        {...rest}
        py={3}
        px={6}
        mt={10}
        bg="black"
        color="secondary"
        fontWeight="bold"
        _hover={{
          color: "black",
          bg: "secondary",
        }}
        transition="all 0.3s"
      />
    )
  } else
    return (
      <Link
        display="block"
        py={2}
        px={3}
        borderRadius="md"
        transition="all 0.3s"
        fontWeight="medium"
        lineHeight="1.25rem"
        color={mode("black", "white")}
        aria-current={isActive ? "page" : undefined}
        _hover={{
          color: mode("secondary", "black"),
          textDecoration: mode(
            "underline solid secondary",
            "underline solid secondary",
          ),
        }}
        _activeLink={{
          bg: mode("blue.600", "blue.200"),
          color: mode("white", "gray.900"),
        }}
        {...rest}
      />
    )
}

export default NavLink
