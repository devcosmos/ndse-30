import BookRepository from './BookRepository'
import { Container, decorate, injectable } from "inversify";

const container = new Container();

decorate(injectable(), BookRepository);
container.bind(BookRepository).toSelf()

export default container
