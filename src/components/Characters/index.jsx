import React, { useEffect, useState } from "react"

import {
  Container,
  SectionTitle,
  CharactersList,
  Character,
  CharacterImage,
  CharacterName,
} from "./style"
import { characters as charactersTexts } from "../../utils/texts"
import { Wrapper } from "../../styles/wrapper"
import { Spinner } from "../Spinner"
import { getCharacters } from "../../api/characters"

export const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCharacters = async () => {
    const { data } = await getCharacters()
    setCharacters(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCharacters()
  }, [])
  return (
    <Container>
      <Wrapper>
        <SectionTitle>{charactersTexts.title}</SectionTitle>
        <CharactersList>
          {characters.map(({ name, img, char_id: id }) => (
            <Character key={id}>
              <CharacterImage src={img} alt={name} />
              <CharacterName>{name}</CharacterName>
            </Character>
          ))}
        </CharactersList>
        {loading && <Spinner />}
      </Wrapper>
    </Container>
  )
}
