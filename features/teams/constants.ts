export const ROV_RANKS = [
  'Bronze III', 'Bronze II', 'Bronze I',
  'Silver III', 'Silver II', 'Silver I',
  'Gold IV', 'Gold III', 'Gold II', 'Gold I',
  'Platinum V', 'Platinum IV', 'Platinum III', 'Platinum II', 'Platinum I',
  'Diamond V', 'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I',
  'Commander V', 'Commander IV', 'Commander III', 'Commander II', 'Commander I',
  'Conqueror',
  'Overlord Conqueror IV', 'Overlord Conqueror III', 'Overlord Conqueror II', 'Overlord Conqueror I',
  'Supreme Conqueror',
  'Immortal Conqueror',
  'Glorious Ruler',
] as const;

export function getRankImageUrl(rankName: string | null): string | null {
  if (!rankName) return null;
  const name = rankName.trim();
  if (name.includes('Bronze')) return '/images/rank-rov/Bronze.png';
  if (name.includes('Silver')) return '/images/rank-rov/Silver.png';
  if (name.includes('Gold')) return '/images/rank-rov/Gold.png';
  if (name.includes('Platinum')) return '/images/rank-rov/Platinum.png';
  if (name.includes('Diamond')) return '/images/rank-rov/Diamond.png';
  if (name.includes('Commander')) return '/images/rank-rov/Commander.png';
  if (name === 'Conqueror') return '/images/rank-rov/Conqueror.png';
  if (name === 'Overlord Conqueror I') return '/images/rank-rov/Overlord I.png';
  if (name === 'Overlord Conqueror II') return '/images/rank-rov/Overlord II.png';
  if (name === 'Overlord Conqueror III') return '/images/rank-rov/Overlord III.png';
  if (name === 'Overlord Conqueror IV') return '/images/rank-rov/Overlord IV.png';
  if (name === 'Supreme Conqueror') return '/images/rank-rov/Supreme.png';
  if (name === 'Immortal Conqueror') return '/images/rank-rov/Immortal.png';
  if (name === 'Glorious Ruler') return '/images/rank-rov/Glorious.png';
  return null;
}

export function getPositionImageUrl(positionKey: string | null): string | null {
  if (!positionKey) return null;
  switch (positionKey) {
    case 'dark_slayer':
      return '/images/position-rov/Dark Slayer.png';
    case 'abyssal_dragon':
      return '/images/position-rov/Abyssal Dragon.png';
    case 'mid_lane':
      return '/images/position-rov/Midlane.png';
    case 'jungle':
      return '/images/position-rov/Jungle.png';
    case 'support':
      return '/images/position-rov/Support.png';
    default:
      return null;
  }
}
