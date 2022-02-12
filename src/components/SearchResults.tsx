import { List, ListRowRenderer } from 'react-virtualized';

import { ProductItem } from "./ProductItem";


interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
  totalPrice: number;
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })} */}
    </div>
  );
}

// useMemo -> memorize calcs between renderings

// When use
// 1. Heavy Calculations
// 2. Referential equality (when we pass that information to a child component)

// useCallback -> prevent the recreation of a function 

//When use: 
//1. Function that is passed to a child component