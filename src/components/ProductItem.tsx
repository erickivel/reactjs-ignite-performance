import { memo, useState } from 'react';
import { AddProductToWishListProps } from './AddProductToWishList';
import dynamic from 'next/dynamic';
import lodash from 'lodash';

// import { AddProductToWishList } from './AddProductToWishList';

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
});

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
});

// Memo avoid the creation of a new component (1) -> shallow compare -> compare properties
// If a property doesn't change the child component will not be re-rendered
// When use:
// 1. Pure Functional Components (same parameters same)
// 2. Components that render to often
// 3. Re-renders with same props
// 4. Medium to big size

// useMemo

// React Reconciliation Algorithm
// 1. Create a new version of the component
// 2. Compare the previous version of the component
// 3. If there have been changes, will update what has changed