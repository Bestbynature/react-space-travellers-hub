import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Myprofile from '../components/Myprofile';

jest.mock('../components/Profilemission', () => function MockedProfilemission() {
  return <div>Mocked Profilemission</div>;
});

jest.mock('../components/Profilerocket', () => function MockedProfilerocket() {
  return <div>Mocked Profilerocket</div>;
});

describe('Myprofile', () => {
  test('renders profile missions and profile rockets', () => {
    const { getByText } = render(<Myprofile />);

    expect(getByText('Mocked Profilemission')).toBeInTheDocument();
    expect(getByText('Mocked Profilerocket')).toBeInTheDocument();
  });
});

// import React from 'react';
// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Myprofile from '../components/Myprofile';

// jest.mock('../components/Profilemission', () => () => <div>Mocked Profilemission</div>);
// jest.mock('../components/Profilerocket', () => () => <div>Mocked Profilerocket</div>);

// describe('Myprofile', () => {
//   test('renders profile missions and profile rockets', () => {
//     const { getByText } = render(<Myprofile />);

//     expect(getByText('Mocked Profilemission')).toBeInTheDocument();
//     expect(getByText('Mocked Profilerocket')).toBeInTheDocument();
//   });
// });
