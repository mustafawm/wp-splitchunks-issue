export type ProfileRoutes = Record<
  'setting' | 'id' | 'location' | 'certification',
  { url: string; display: string }
>;

const profileRoutes: ProfileRoutes = {
  setting: {
    url: '',
    display: 'navigation.profile.sections.personal.display',
  },
  id: {
    url: 'identification',
    display: 'navigation.profile.sections.id.display',
  },
  location: {
    url: 'location',
    display: 'navigation.profile.sections.location.display',
  },
  certification: {
    url: 'certification',
    display: 'navigation.profile.sections.cert.display',
  },
};

export default profileRoutes;
