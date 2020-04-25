package expenses.server.persistence.entity;

import expenses.server.rest.dto.CategoryDTO;
import expenses.server.rest.dto.CategoryWithSubcategoriesDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "CATEGORY")
@NoArgsConstructor
@Getter
public class CategoryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME", unique = true, nullable = false)
	private String name;

	@OneToMany(mappedBy = "category")
	@OrderBy("name")
	private List<SubcategoryEntity> subcategories = new ArrayList<>();

	public CategoryEntity(final CategoryDTO dto) {
		id = dto.getId();
		name = dto.getName();
	}

	public CategoryDTO mapToDto() {
		return new CategoryDTO(id, name);
	}

	public CategoryWithSubcategoriesDTO mapToDtoWithSubcategories() {
		return new CategoryWithSubcategoriesDTO(
				id,
				name,
				subcategories.stream().map(SubcategoryEntity::mapToDto).collect(Collectors.toList())
		);
	}

}
