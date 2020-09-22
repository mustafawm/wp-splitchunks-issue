import React from 'react';

export default function SectionTitle(props: {
  text: string;
  className?: string;
}) {
  return (
    <p
      className={`text-green-600 font-thin my-3 capitalize ${props.className}`}
    >
      {props.text}
    </p>
  );
}
