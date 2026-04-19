import { useQuery } from "@tanstack/react-query";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { listStudents } from "@/features/students/service";

export default function StudentList() {
  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: listStudents,
  });

  return (
    <div>
      <Button>Click me</Button>
      <ThemeSwitcher />
      <h1 className="text-xl">Students</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students?.map((student) => (
            <li key={student.id}>
              <p>{student.id}</p>
              <p>{student.name}</p>
              <p>{student.email}</p>
              <p>{student.age}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
