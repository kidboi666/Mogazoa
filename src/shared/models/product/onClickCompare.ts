import { Product } from '@/shared/types/product/product';
import { SetStateAction } from 'react';
import { compareProducts } from './compareProducts';
import { saveUserProduct } from './saveUserProduct';

interface Props {
  productIdData1: Product | undefined;
  productIdData2: Product | undefined;
  setWinnerCount: React.Dispatch<SetStateAction<number>>;
  setIsTable: React.Dispatch<SetStateAction<boolean>>;
}

export const onClickCompare = ({
  productIdData1,
  productIdData2,
  setWinnerCount,
  setIsTable,
}: Props) => {
  if (productIdData1 && productIdData2) {
    // 주스탠드로 묶어서 나중에 해보기.
    const {
      rating: rating1,
      reviewCount: reviewCount1,
      favoriteCount: favoriteCount1,
    } = productIdData1;

    const {
      rating: rating2,
      reviewCount: reviewCount2,
      favoriteCount: favoriteCount2,
    } = productIdData2;

    const result1 = compareProducts(rating1, rating2);
    const result2 = compareProducts(reviewCount1, reviewCount2);
    const result3 = compareProducts(favoriteCount1, favoriteCount2);

    let winnerCount = 0;
    if (result1 === '상품 1 승리') winnerCount++;
    if (result1 === '상품 2 승리') winnerCount--;
    if (result2 === '상품 1 승리') winnerCount++;
    if (result2 === '상품 2 승리') winnerCount--;
    if (result3 === '상품 1 승리') winnerCount++;
    if (result3 === '상품 2 승리') winnerCount--;

    setWinnerCount(winnerCount);
    setIsTable(true);
    saveUserProduct({ productIdData1, productIdData2 });
  } else {
    alert('상품을 각각 선택해 주세요.');
  }
};
