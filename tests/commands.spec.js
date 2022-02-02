const {Spreetail} = require('../index.js');

describe('Running test for Spreetail class', () => {
   test('KEYS: Should return keys of foo and bazz', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar')
      spreetail.add('bazz', 'buzz')
      const keys = spreetail.keys();
      expect(keys).toContain('foo')
      expect(keys).toContain('bazz')
   });
   test('MEMBERS: Should return all members of key foo', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar')
      spreetail.add('foo', 'buzz')
      spreetail.add('foo', 'bazz')
      const members = spreetail.members('foo');
      expect(members).toContain('bazz')
   });
   test('ADD: add key of foo and member of bar', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar')
      const members = spreetail.members('foo');
      const keyExists = spreetail.keyexists('foo');
      expect(keyExists).toEqual(true);
      expect(members.has('bar')).toBe(true);
   });
   test('REMOVE: remove member bazz from key of foo', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar')
      spreetail.add('foo', 'bazz')
      spreetail.add('foo', 'buzz')
      expect(spreetail.members('foo')).toContain('bar');
      spreetail.remove('foo', 'bar')
      expect(spreetail.members('foo')).not.toContain('bar');
   });
   test('REMOVE: remove member bazz from key of foo should remove key', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar')
      expect(spreetail.members('foo')).toContain('bar');
      spreetail.remove('foo', 'bar')
      expect(spreetail.keyexists('foo')).toBe(false);
   });
   test('REMOVEALL: remove all members of foo', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar')
      spreetail.add('foo', 'bazz')
      spreetail.add('foo', 'buzz')
      expect(spreetail.members('foo').size).toBe(3);
      spreetail.removeall('foo');
      expect(spreetail.keyexists('foo')).toBe(false);
   });
   test('CLEAR: removes all keys and all members', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar')
      spreetail.add('bazz', 'buzz')
      expect(spreetail.keys()).toContain('foo');
      expect(spreetail.keys()).toContain('bazz');
      spreetail.clear();
      expect(spreetail.keys().length).toBe(0);
   });
   test('KEYEXISTS: Should return true if a key exists and false if not', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar');
      expect(spreetail.keyexists('foo')).toBe(true);
      spreetail.removeall('foo')
      expect(spreetail.keyexists('foo')).toBe(false);
   });
   test('MEMBEREXISTS: Should return true if member in key and false if not', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar');
      spreetail.add('foo', 'bazz');
      expect(spreetail.membersexists('foo', 'bar')).toBe(true);
      spreetail.remove('foo', 'bar');
      expect(spreetail.membersexists('foo', 'bar')).toBe(false);
   })
   test('ALLMEMBERS: returns all memebers from foo', () => {
      const spreetail = new Spreetail();
      spreetail.add('foo', 'bar');
      spreetail.add('foo', 'bazz');
      spreetail.add('foo', 'buzz');
      const members = spreetail.allmembers('foo');
      expect(members).toContain('bar');
      expect(members).toContain('bazz');
      expect(members).toContain('buzz');
   })
});