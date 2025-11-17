import { Email } from 'domain/value-objects/email';

describe('Email Value Object', () => {
  describe('constructor', () => {
    it('should create a valid email', () => {
      const email = new Email('test@example.com');
      expect(email.getValue()).toBe('test@example.com');
    });

    it('should normalize email to lowercase', () => {
      const email = new Email('TEST@EXAMPLE.COM');
      expect(email.getValue()).toBe('test@example.com');
    });

    it('should trim whitespace', () => {
      const email = new Email('  test@example.com  ');
      expect(email.getValue()).toBe('test@example.com');
    });

    it('should throw error for invalid email format', () => {
      expect(() => new Email('invalid-email')).toThrow('Invalid email format');
      expect(() => new Email('')).toThrow('Invalid email format');
      expect(() => new Email('test@')).toThrow('Invalid email format');
      expect(() => new Email('@example.com')).toThrow('Invalid email format');
    });
  });

  describe('isValid', () => {
    it('should return true for valid emails', () => {
      expect(Email.isValid('test@example.com')).toBe(true);
      expect(Email.isValid('user.name@domain.co.uk')).toBe(true);
      expect(Email.isValid('test+tag@example.org')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      // @ts-ignore
      expect(Email.isValid(false)).toBe(false);
      expect(Email.isValid('')).toBe(false);
      expect(Email.isValid('invalid')).toBe(false);
      expect(Email.isValid('test@')).toBe(false);
      expect(Email.isValid('@example.com')).toBe(false);
      expect(Email.isValid('test..test@example.com')).toBe(false);
      expect(Email.isValid("test@@example.com")).toBe(false);
    });
  });

  describe('create', () => {
    it('should create email using static factory method', () => {
      const email = Email.create('test@example.com');
      expect(email.getValue()).toBe('test@example.com');
    });
  });

  describe('equals', () => {
    it('should return true for equal emails', () => {
      const email1 = new Email('test@example.com');
      const email2 = new Email('TEST@EXAMPLE.COM');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should return false for different emails', () => {
      const email1 = new Email('test1@example.com');
      const email2 = new Email('test2@example.com');
      expect(email1.equals(email2)).toBe(false);
    });
  });

    describe("domain", () =>{
        it("should return the part after the @", ()=> {
            const email = new Email("truc@muche.com");
            const email2 = new Email("machin@chouette.fr");

            expect(email.getDomain() == "muche.com").toBe(true);
            expect(email2.getDomain() == "chouette.fr").toBe(true);
        })
    });

    describe("local_part", () => {
        it("should return the part before the @", () => {
            const email = new Email("truc@muche.com");
            const email2 = new Email("machin@chouette.fr");

            expect(email.getLocalPart() == "truc").toBe(true);
            expect(email2.getLocalPart() == "machin").toBe(true);
        })
    })
});
