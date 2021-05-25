import { Test, TestingModule } from '@nestjs/testing';
import { TwitchAuthCryptoService } from './twitch-auth-crypto.service';

describe('TwitchAuthCryptoService', () => {
  let service: TwitchAuthCryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitchAuthCryptoService],
    }).compile();
    service = module.get<TwitchAuthCryptoService>(TwitchAuthCryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be 4 chars long', () => {
    expect(service.generateCode()).toHaveLength(4);
  });
  it('should be all uppercase', () => {
    const code = service.generateCode();
    expect(code).toBe(code.toUpperCase());
  });
  it('should be random', () => {
    const code1 = service.generateCode();
    const code2 = service.generateCode();
    expect(code1 !== code2).toBeTruthy();
  });
});
