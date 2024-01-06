type Size = 'sm' | 'md' | 'lg';

const getSizeValue = (size: Size): number => {
    const sizeMap: { [key in Size]: number } = {
      'sm': 0, 
      'md': 30,
      'lg': 20,
    };
    return sizeMap[size];
};

export default getSizeValue;