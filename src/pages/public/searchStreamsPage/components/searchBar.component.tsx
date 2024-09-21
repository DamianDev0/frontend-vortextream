import React, { useState } from "react";
import styled from "styled-components";

interface SearchBarComponentProps {
  onSearchChange: (query: string) => void;
}

const SearchBarComponent = ({ onSearchChange }: SearchBarComponentProps) => {
  const [ query, setQuery ] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearchChange(newQuery)
  }
  
  return (
        <StyledWrapper>
          <div className="input-container">
            <input
              className="input"
              value={query}
              onChange={handleChange}
              type="text"
              placeholder="Search..."
            />
          </div>
        </StyledWrapper>
      );
}

const StyledWrapper = styled.div`
  .input {
  width: 100%;
  height: 60px;
  padding: 12px;
  font-size: 18px;
  font-family: "Courier New", monospace;
  background-color: #fff;
  border: 4px solid #000;
  border-radius: 0;
  outline: none;
  transition: all 0.3s ease;

}

.input::placeholder {
  color: #888;
}

.input:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000;
}

.input:focus {
  background-color: #2F3241;
  color: #fff;
  border-color: #F08080;
}

.input:focus::placeholder {
  color: #fff;
}


.input-container {
  position: relative;
  width: 100%;
}

.input {
  width: 40rem;
  height: 45px;
  padding: 12px;
  font-size: 18px;
  font-family: "Courier New", monospace;
  color: #000;
  background-color: #2F3241;
  border: 4px solid #000;
  border-radius: 0;
  outline: none;
  box-shadow: 8px 8px 0 #000;
}

.input::placeholder {
  color: white;
  text-align: center
}

.input:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #F08080;
}

.input:not(:placeholder-shown) {
  animation: glitch 1s linear infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}


.input:not(:placeholder-shown) {
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 0px 0px 0 #000;
}

`;
export default SearchBarComponent

