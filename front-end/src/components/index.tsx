
function Components(){
  const uwLink: string = process.env.UW_LIBRARY_RESERVATION_LINK as string;

  return (
    <div>
      <a href={uwLink}>
        <button>to reserve</button>
      </a>
    </div>
  )
}

export default Components;