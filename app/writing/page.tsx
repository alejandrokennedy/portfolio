"use client"

import books from '../../data/books.json';

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile';
import { BookCard } from '@/components/BookCard/BookCard';
import { Container, Stack } from '@mantine/core';

const Books = () => {
  return (
    <AppShellMobile>
      <Container my="md">
        <Stack gap="xl">
          {books.map(book => (
            <BookCard
              key={book.title}
              title={book.title}
              edition={book.edition}
              authors={book.authors}
              publisher={book.publisher}
              year={book.year}
              url={book.url}
              imgUrl={book.imgUrl}
              description={book.description}
              features={book.features}
              conclusion={book.conclusion}
            />
          ))}
        </Stack>
      </Container>
    </AppShellMobile>
  )
}

export default Books
