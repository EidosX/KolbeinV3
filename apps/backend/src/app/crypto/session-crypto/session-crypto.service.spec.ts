import { Test, TestingModule } from '@nestjs/testing';
import { SessionCryptoService } from './sessions-crypto.service';

describe('SessionsCryptoService', () => {
  let service: SessionCryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionCryptoService],
    }).compile();
    service = module.get<SessionCryptoService>(SessionCryptoService);
  });

  /*
   * ID Generation
   */

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('generates id with correct length', () => {
    expect(service.generateId().length).toBe(SessionCryptoService.ID_LENGTH);
  });
  it('generates random ids', () => {
    const id1 = service.generateId();
    const id2 = service.generateId();
    expect(id1 !== id2).toBeTruthy();
  });

  /*
   * Signature
   */

  it('makes the same signature for the same string', () => {
    const str1 = 'g2f4iJ5Cf64FD8GfoX2';
    const str2 = 'g2f4iJ5Cf64FD8GfoX2';
    expect(service.sign(str1)).toBe(service.sign(str2));
  });
  it('signs differently for very similar strings', () => {
    const str1 = 'a3aFD5dfdG6uFD7iC';
    const str2 = 'a3aFD6dfdG6uFD7iC';
    expect(service.sign(str1) !== service.sign(str2));
  });

  /*
   * Client String generation
   */

  it('generates correct client string', () => {
    const id = service.generateId();
    const clientString = service.generateClientString(id);
    expect(clientString).toBe(`s.${id}.${service.sign(id)}`);
  });
  it('generates same client string when passing the same id', () => {
    const id = service.generateId();
    const clientString1 = service.generateClientString(id);
    const clientString2 = service.generateClientString(id);
    expect(clientString1).toBe(clientString2);
  });

  /*
   * Client string verification and parsing
   */

  it('recognizes and parses valid client string', () => {
    const id = service.generateId();
    const clientString = service.generateClientString(id);
    expect(service.verifyClientStringAndGetId(clientString)).toBe(id);
  });
  it("doesn't recognize invalid client strings", () => {
    const id = service.generateId();
    let clientString = service.generateClientString(id);
    const alteredIndex = 41;
    clientString =
      clientString.substring(0, alteredIndex) +
      (clientString[alteredIndex] === 'a' ? 'b' : 'a') +
      clientString.substring(alteredIndex + 1);
    expect(service.verifyClientStringAndGetId(clientString)).toBe(null);
  });
});
