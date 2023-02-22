import styled from '@emotion/styled';

export const GalleryItem = styled.li`
  border-radius: ${({ theme }) => {
    return theme.borderRadius;
  }};
  overflow: hidden;
  box-shadow: ${({ theme }) => {
    return theme.boxShadow;
  }};
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
